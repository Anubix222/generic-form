import { Actions, Notification } from "./types";
import { atom, useAtom } from "jotai";
import { useCallback, useMemo } from "react";
import isMobile from "../../utils/is-mobile";

import type { SnackbarKey } from "notistack";


const notificationsState = atom<Notification[]>([]);

const notificationsDefaults: any = {
    options: {
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
        },
        autoHideDuration: 5000,
    },
    maxSnack: isMobile ? 3 : 4,
};



function useNotifications(): [Notification[], Actions] {
    const [notifications, setNotifications] = useAtom(notificationsState);

    const push = useCallback(
        (notification: Partial<Notification>) => {
            // TODO (Suren): use uuid

            setNotifications((notifications): Notification[] => [
                // TODO (Suren): use immer
                ...notifications,
                {
                    ...notification,
                    message: notification.message,
                    dismissed: false,
                    options: {
                        ...notificationsDefaults.options,
                        ...notification.options,
                    },
                },
            ]);

            return notification?.options?.key ?? "";
        },
        [setNotifications]
    );

    const close = useCallback(
        (key: SnackbarKey, dismissAll = !key) => {
            setNotifications((notifications) =>
                notifications.map((notification) =>
                    dismissAll || notification.options.key === key
                        ? { ...notification, dismissed: true }
                        : { ...notification }
                )
            );
        },
        [setNotifications]
    );

    const remove = useCallback(
        (key: SnackbarKey) => {
            setNotifications((notifications) =>
                notifications.filter((notification) => notification.options.key !== key)
            );
        },
        [setNotifications]
    );

    const actions = useMemo(
        () => ({ push, close, remove }),
        [push, close, remove]
    );

    return [notifications, actions];
}

export default useNotifications;
