import React from 'react';
import './App.css';


interface Param {
    id: number;
    name: string;
    type: 'string';
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
    // colors: Color[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    paramValues: ParamValue[];
}

class ParamEditor extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            paramValues: props.model.paramValues,
        };
    }

    getModel = (): Model => {
        return {
            paramValues: this.state.paramValues,
        };
    }

    handleParamChange = (paramId: number, value: string) => {
        const { paramValues } = this.state;

        const updatedParamValues = paramValues.map((paramValue) => {
            if (paramValue.paramId === paramId) {
                return { ...paramValue, value };
            }
            return paramValue;
        });

        this.setState({ paramValues: updatedParamValues });
    };

    render() {
        const { params } = this.props;
        const { paramValues } = this.state;

        return (
            <main className="main">
                {params.map((param) => {
                    const paramValue = paramValues.find((paramValue) => paramValue.paramId === param.id);
                    const value = paramValue ? paramValue.value : '';

                    return (
                        <div key={param.id}>
                            <label>{param.name}</label>
                            <input
                                type="text"
                                value={value}
                                onChange={(e) => this.handleParamChange(param.id, e.target.value)}
                            />
                        </div>
                    );
                })}
                <button onClick={() => console.log(this.getModel())}>Посмотреть параметры в консоли</button>
            </main>
        );
    }
}

const params: Param[] = [
    { id: 1, name: 'Назначение', type: 'string' },
    { id: 2, name: 'Длина', type: 'string' },
];

const model: Model = {
    paramValues: [
        { paramId: 1, value: 'повседневное' },
        { paramId: 2, value: 'макси' },
    ],
};

function App() {
    return (
        <div>
            <ParamEditor params={params} model={model} />
        </div>
    );
}

export default App;