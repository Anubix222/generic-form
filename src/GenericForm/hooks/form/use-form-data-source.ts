import { atom, useAtom } from "jotai";

const formDataSource = atom<any>(null);

function useFormDataSource() {
    return useAtom(formDataSource);
}
export default useFormDataSource;
