export class AppNotify {
    static info(message: string, timeShown: number = 5000, isHTMLContent: boolean = false) {
        // notify(AppNotify.getNotifyOptions(message, isHTMLContent), 'info', timeShown);
    }

    static warning(message: string, timeShown: number = 5000, isHTMLContent: boolean = false) {
        // notify(AppNotify.getNotifyOptions(message, isHTMLContent), 'warning', timeShown);
    }

    static error(message: string, timeShown: number = 5000, isHTMLContent: boolean = false) {
        // notify(AppNotify.getNotifyOptions(message, isHTMLContent), 'error', timeShown);
    }

    static success(message?: string, timeShown: number = 5000, isHTMLContent: boolean = false) {
        // notify(AppNotify.getNotifyOptions(message || SUCCESSFULLY, isHTMLContent), 'success', timeShown);
    }

    static alert(message: string, title: string) {
        // return alert(message, title);
    }

    private static getNotifyOptions(message: string, isHTMLContent: boolean = false) {
        // https://js.devexpress.com/Documentation/20_2/ApiReference/UI_Components/dxToast/Configuration/#message
        return {
            message: !isHTMLContent ? message : '',
            contentTemplate: isHTMLContent
                ? `<div class="dx-toast-message">${message}</div>`
                : undefined,
            closeOnClick: true
        };
    }

    /**
     * The message format:
     * - "The item has been added"
     * - "2 items have been deleted"
     */
    public static generateSuccessMessage(object: string = 'item', action: string = 'added', multiple: boolean = false): string {
        return `${multiple ? object : 'The ' + object} `
            + `${multiple ? 'have been' : 'has been'} `
            + `${action}.`;
    }
}

export const ERROR = 'An error has occurred!';
export const SUCCESSFULLY = 'Successfully done';
export const SUBMIT_SUCCESS = 'Submitted successfully!';
export const RESUBMIT_SUCCESS = 'Resubmitted successfully!';
export const ADD_SUCCESS = 'Add successfully!';
export const UPDATE_SUCCESS = 'Updated successfully!';
export const DELETE_SUCCESS = 'Deleted successfully';
export const NO_AUTHORIZED = 'You are not authorized!';
export const UPDATE_UNSUCCESS = 'Error when Updating.';
