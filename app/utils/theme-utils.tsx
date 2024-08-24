import React from "react";
import LinearGradient from "react-native-linear-gradient";

export const getLinearGradient = (gradient: string[], style?: any): JSX.Element => (
    <React.Fragment>
      <LinearGradient 
        colors={gradient}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={style || { flex: 1 }}
      />
    </React.Fragment>
)