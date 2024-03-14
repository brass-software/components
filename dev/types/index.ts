

export type Action = {
    Name: string;
    Endpoint: string;
    Inputs: Field[];
    Outputs: Field[];
}

export interface Field {
    ID: string;
    Name: string;
    Type: Type;
}

export interface Component {
    ID: string;
    Name: string;
    PropTypes: Field[];
    StateTypes: Field[];
    Render: Statement[];
}

export type Expression = {
    IsLiteral: true;
    Value: string;
} | {
    IsName: true;
    Value: string;
} | {
    IsCall: true;
    Fn: string;
    Inputs: Expression[];
}

export type Statement = {
    IsReturn: true;
    Return: Expression;
} | {
    IsDecl: true;
    Decl: Declaration;
} | {
    IsIf: true;
    If: IfStatement;
}

export type IfStatement = {
    Condition: Expression;
    Body: Statement[];
}

export type Declaration = {
    Name: string;
    IsConst: true;
    Const: Const;
} | {
    Name: string;
    IsVar: true;
    Var: Var;
} | {
    Name: string;
    IsFunc: true;
    Func: Func;
} | {
    Name: string;
    IsType: true;
    Type: Type;
}

export type Const = {
    Type: Type;
    Value: Expression;
}

export type Var = {
    Type: Type;
    Value: Expression;
}

export type Func = {
    Inputs: Field[];
    Outputs: Field[];
    Body: Statement[];
}

export type Type = {
    ID: string;
    Name: string;
    PluralName: string;
    IsScalar: true;
    Scalar: string
} | {
    ID: string;
    Name: string;
    PluralName: string;
    IsMap: true;
    ElemType: Type;
} | {
    ID: string;
    Name: string;
    PluralName: string;
    IsArray: true;
    ElemType: Type;
} | {
    ID: string;
    Name: string;
    PluralName: string;
    IsStruct: true;
    Fields: Field[];
}
