import {NextPage} from "next";
import Palette from "@components/Palette";

const Home: NextPage = () => {
    return (
        <main className="flex flex-col gap-3 p-4">
            <Palette
                title={'Primary'}
                color={'27AE60'}
            />
            <Palette
                title={'Backgrounds'}
                color={'938F96'}
            />
        </main>
    );
}

export default Home;
