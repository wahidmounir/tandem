import * as React from "react";
import Token from "../models/token";
import Line from "../models/line";
import TextEditor from "../models/text-editor";
import { Dependencies } from "@tandem/common/dependencies";
import { TokenComponentFactoryDependency } from "@tandem/front-end/dependencies";

class TokenComponent extends React.Component<{ token: Token, editor: TextEditor, line: Line, dependencies: Dependencies }, any> {


  render() {
    const { token, dependencies } = this.props;

    const props: any = {};

    const tokenFactory = TokenComponentFactoryDependency.find(token.type, dependencies);

    if (tokenFactory) {
      props.children = tokenFactory.create(this.props);
    }

    if (!props.children) {
      props.dangerouslySetInnerHTML = {
        __html: token.encodedValue
      };
    }

    return <div
      ref="token"
      className={"m-text-editor--token " + "m-text-editor--token-" + token.type }
      {...props}>
    </div>;
  }
}

export default TokenComponent;