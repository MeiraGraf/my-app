import * as registerQuery from 'query-registry';
import { useCallback, useState } from 'react';
import { PackageNodeInfo } from './Types';

export const getNpmData = async (
    packageName: string
): Promise<PackageNodeInfo | undefined> => {
    try {
        const { dependencies, description } =
            await registerQuery.getRawPackageManifest({
                name: packageName,
            });
        return { dependencies, description };
    } catch (error) {
        window.alert(
            'An error occurred fetching data - see logs for more info.'
        );
        console.error(error);
    }
};

export const useCenteredTree = (defaultTranslate = { x: 0, y: 0 }) => {
    const [translate, setTranslate] = useState(defaultTranslate);
    const containerRef = useCallback((containerElem) => {
        if (containerElem !== null) {
            const { width, height } = containerElem.getBoundingClientRect();
            setTranslate({ x: width / 2, y: height / 2 });
        }
    }, []);
    return [translate, containerRef];
};
