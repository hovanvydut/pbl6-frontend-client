export class ObjectHelper {
    public static convertToQueryParams(data: object | any): string {
        return Object.keys(data).map((key) => {
            const value: any = data[key] == null ? '' : data[key];
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        }).join('&');
    }

    public static convertObjectToArray(data: object | any): {key: any, value: any}[] {
        return  Object.keys(data).map(key => {
            return {key: key, value: data[key]}
        })
    }
}
