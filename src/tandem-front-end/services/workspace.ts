
import { WrapBus } from "mesh";
import { MetadataKeys } from "tandem-front-end/constants";
import { FrontEndApplication } from "tandem-front-end/application";
import { Workspace, DocumentFile } from "tandem-front-end/models";
import { EditorToolFactoryDependency } from "tandem-front-end/dependencies";
import { dependency as pointerToolDependency } from "tandem-front-end/models/pointer-tool";
import { SetToolAction, ZoomAction, DocumentFileAction } from "tandem-front-end/actions";

import {
  File,
  tween,
  Action,
  Logger,
  inject,
  loggable,
  IDisposable,
  easeOutCubic,
  DSFindAction,
  watchProperty,
  Dependencies,
  DEPENDENCIES_NS,
  InitializeAction,
  OpenProjectAction,
  BaseApplicationService,
  ApplicationServiceDependency,
  GetPrimaryProjectFilePathAction,
} from "tandem-common";

@loggable()
export class WorkspaceService extends BaseApplicationService<FrontEndApplication> {
  public logger: Logger;

  @inject(DEPENDENCIES_NS)
  private _dependencies: Dependencies;
  private _tweener: IDisposable;
  private _zoomTimeout: any;

  async [InitializeAction.INITIALIZE](action: Action) {
    await this._loadWorkspaces();

    // set the pointer tool as default. TODO - this
    // will need to change if the editor differs depending on the file type
    await this.bus.execute(new SetToolAction(this._dependencies.query<EditorToolFactoryDependency>(pointerToolDependency.ns)));
  }

  async _loadWorkspaces() {

    const filePath = await GetPrimaryProjectFilePathAction.execute(this.bus);

    if (this.app.workspace && this.app.workspace.file.path === filePath) return;

    this.logger.info("loading project file %s", filePath);

    const file = await File.open(filePath, this._dependencies) as DocumentFile<any>;
    file.sync();

    await new Promise((resolve, reject) => {

      // odd code, but we need to listen when the document is *successfuly*
      // loaded in before initializing the app. It may load with errors which
      // will break initialization
      const loadObserver = new WrapBus((action: Action) => {
        if (action.type !== DocumentFileAction.LOADED) return;
        this.bus.register(this.app.workspace = new Workspace(<DocumentFile<any>>file));
        file.observe(this.app.bus);
        file.unobserve(loadObserver);
        resolve();
      });

      file.observe(loadObserver);

      file.load();
    });
  }

  [OpenProjectAction.OPEN_PROJECT_FILE](action: OpenProjectAction) {
    return this._loadWorkspaces();
  }

  [ZoomAction.ZOOM](action: ZoomAction) {
    if (this._tweener) this._tweener.dispose();
    const delta = action.delta * this.app.workspace.editor.zoom;

    if (!action.ease) {
      this.app.workspace.editor.zoom += delta;
      this._zooming();
      return;
    }

    this._tweener = tween(this.app.workspace.editor.zoom, this.app.workspace.editor.zoom + delta, 200, (value) => {
      this.app.workspace.editor.zoom = value;
      this._zooming();
    }, easeOutCubic);
  }


  private _zooming() {
    clearTimeout(this._zoomTimeout);
    this.app.metadata.set(MetadataKeys.ZOOMING, true);
    this.app.bus.execute(new Action("zooming"));
    this._zoomTimeout = setTimeout(() => {
      this.app.metadata.set(MetadataKeys.ZOOMING, false);
      this.app.bus.execute(new Action("zoomingComplete"));
    }, 100);
  }

  [SetToolAction.SET_TOOL](action: SetToolAction) {
    this.app.workspace.editor.currentTool = action.toolFactory.create(this.app.workspace.editor);
  }
}

export const dependency = new ApplicationServiceDependency("workspace", WorkspaceService);
