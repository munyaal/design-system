import {FC} from "react";

type ColorProps = {
    colorKey: string;
    colorCode: string;
}

const Color: FC<ColorProps> = (props) => {
    const {colorKey, colorCode} = props;

    return (
        <div
            className={'p-2 flex-auto'}
            style={{backgroundColor: colorCode}}
        >
            <p className={'text-xs'}>{colorKey}</p>
            <p className={'text-xs'}>{colorCode}</p>
        </div>
    )
}

export default Color;