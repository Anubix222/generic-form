import { useCallback, useMemo } from "react";
import { atom, useAtom } from "jotai";

import type { Actions } from "./types";

const modalOpenState = atom<string | null>(null);

function useModalState(): {
    modalState: string | null;
    modalActions: Actions;
} {
    const [modalState, setIsOpen] = useAtom(modalOpenState);

    const close = useCallback(() => {
        setIsOpen(null);
    }, []);

    const open = useCallback((modalName: string) => {
        setIsOpen(modalName);
    }, []);

    const modalActions = useMemo(() => ({ close, open }), []);

    return { modalState, modalActions };
}
export default useModalState;
