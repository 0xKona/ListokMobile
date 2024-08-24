import React from "react";
import LinearGradient from "react-native-linear-gradient";

export const getLinearGradient = (gradient: string[], style?: any): JSX.Element => (
    <React.Fragment>
      <LinearGradient 
        colors={gradient}
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0.15, y: 0 }}
        style={style || { flex: 1 }}
      />
    </React.Fragment>
)