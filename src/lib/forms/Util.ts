export function getOrIfEmptyUndefined(
    formKey: string,
    formData: FormData,
): any {
    const v = formData.get(formKey);
    if (v == "") {
        return undefined;
    } else {
        return v;
    }
}

export async function getFileBase64OrIfEmptyUndefined(
    formKey: string,
    formData: FormData,
): Promise<string | null> {
    const file: File | undefined = formData.get(formKey) as File;
    if (!file || file.name == "") {
        return null;
    }
    const r = await getBase64(file);
    if (r == "" || r == "data:application/octet-stream;base64,") {
        return null;
    } else {
        return r;
    }
}

function getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // @ts-ignore
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}

export const isNonEmptyString = (x: string | null | undefined) =>
    x != "" && x != null && x != undefined && x.trim() != "";
