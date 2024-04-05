import {FC, useMemo} from "react";
import {useColorTools} from "@/hooks/useColorTools";
import Color from "@components/Color";

type PaletteProps = {
    title: string;
    color: string;
}

const Palette: FC<PaletteProps> = (props) => {
    const {color, title} = props;

    const {createPalette} = useColorTools();

    const colors = useMemo(() => {
        const palette = createPalette(color);

        return Object.entries(palette);
    }, [createPalette, color]);

    return (
        <div className={'flex flex-col gap-3'}>
            <h3 className={'font-medium'}>{title}</h3>

            <div className={'flex flex-auto'}>
                {colors.map(([colorKey, colorCode]) => (
                    <Color
                        key={`$${title.toLowerCase()}${colorKey}`}
                        colorKey={colorKey}
                        colorCode={colorCode}
                    />
                ))}
            </div>
        </div>
    )
}

export default Palette;