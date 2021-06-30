import { Input } from "@material-ui/core";
import React from "react";



const LargeTextInput = (props: any) => {
  return (

    <div style={{ marginBottom: "30px", width: "100%" }}>
      <Input
        {...props}
        multiline={true}
        // size="regular"
        //color="lightBlue"
        onChange={props.onChange}
        onBlur={props.onBlur}
        value={props.value}
        error={props.error}
        success={props.success}
        defaultValue= {props.default}
      />
    </div>
  );
};

export default LargeTextInput;
