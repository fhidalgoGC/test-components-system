import * as React from "react";

export interface InputProps extends React.ComponentProps<"input"> {}

export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'datetime-local' | 'time';