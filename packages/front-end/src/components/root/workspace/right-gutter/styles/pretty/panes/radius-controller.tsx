import * as React from "react";
import { ComputedStyleInfo } from "paperclip";
import { BaseRadiusInputProps } from "./borders.pc";
import { memoize } from "tandem-common";

export type Props = {
  onPropertyChange: any;
  onPropertyChangeComplete: any;
  computedStyleInfo: ComputedStyleInfo;
};

export default (Base: React.ComponentClass<BaseRadiusInputProps>) =>
  class RadiusInputController extends React.PureComponent<Props> {
    onPrimaryChange = (value: string) => {
      this.props.onPropertyChange("border-top-left-radius", value);
      this.props.onPropertyChange("border-top-right-radius", value);
      this.props.onPropertyChange("border-bottom-left-radius", value);
      this.props.onPropertyChange("border-bottom-right-radius", value);
    };
    onPrimaryChangeComplete = (value: string) => {
      this.props.onPropertyChangeComplete("border-top-left-radius", value);
      this.props.onPropertyChangeComplete("border-top-right-radius", value);
      this.props.onPropertyChangeComplete("border-bottom-left-radius", value);
      this.props.onPropertyChangeComplete("border-bottom-right-radius", value);
    };
    render() {
      const { onPrimaryChange, onPrimaryChangeComplete } = this;
      const {
        computedStyleInfo,
        onPropertyChange,
        onPropertyChangeComplete,
        ...rest
      } = this.props;
      const connected =
        computedStyleInfo.style["border-top-left-radius"] ===
          computedStyleInfo.style["border-top-right-radius"] &&
        computedStyleInfo.style["border-top-left-radius"] ===
          computedStyleInfo.style["border-bottom-left-radius"] &&
        computedStyleInfo.style["border-top-left-radius"] ===
          computedStyleInfo.style["border-bottom-right-radius"];
      return (
        <Base
          {...rest}
          connected={connected}
          primaryInputProps={{
            value: connected
              ? computedStyleInfo.style["border-top-left-radius"]
              : null,
            onChange: onPrimaryChange,
            onChangeComplete: onPrimaryChangeComplete
          }}
          topLeftInputProps={{
            value: computedStyleInfo.style["border-top-left-radius"],
            onChange: propertyChangeCallback(
              "border-top-left-radius",
              onPropertyChange
            ),
            onChangeComplete: propertyChangeCallback(
              "border-top",
              onPropertyChangeComplete
            )
          }}
          topRightInputProps={{
            value: computedStyleInfo.style["border-top-right-radius"],
            onChange: propertyChangeCallback(
              "border-top-right-radius",
              onPropertyChange
            ),
            onChangeComplete: propertyChangeCallback(
              "border-bottom",
              onPropertyChangeComplete
            )
          }}
          bottomLeftInputProps={{
            value: computedStyleInfo.style["border-bottom-left-radius"],
            onChange: propertyChangeCallback(
              "border-bottom-left-radius",
              onPropertyChange
            ),
            onChangeComplete: propertyChangeCallback(
              "border-left",
              onPropertyChangeComplete
            )
          }}
          bottomRightInputProps={{
            value: computedStyleInfo.style["border-bottom-right-radius"],
            onChange: propertyChangeCallback(
              "border-bottom-right-radius",
              onPropertyChange
            ),
            onChangeComplete: propertyChangeCallback(
              "border-right",
              onPropertyChangeComplete
            )
          }}
        />
      );
    }
  };

const propertyChangeCallback = memoize((name: string, listener) => value =>
  listener(name, value)
);
