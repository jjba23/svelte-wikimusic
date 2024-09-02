import type { Option } from "fp-ts/lib/Option";
import type { NonEmptyString } from "io-ts-types";

export interface CardCarouselItem {
    url: NonEmptyString;
    alt: Option<NonEmptyString>;
}

export const toCarouselItem = (x: {
    contentUrl: NonEmptyString;
    contentCaption: Option<NonEmptyString>;
}): CardCarouselItem => {
    return {
        url: x.contentUrl,
        alt: x.contentCaption,
    };
};

export const sortArtworks = (
    a: { orderValue: number },
    b: { orderValue: number },
) => {
    if (a.orderValue < b.orderValue) {
        return -1;
    } else if (a.orderValue > b.orderValue) {
        return 1;
    } else {
        return 0;
    }
};

export const makeRandomDuration = (x: number) => {
    let some = Math.random() + Math.random();
    let some2 = Math.random() + Math.random();
    let m = some + some2;
    if (m > 0) {
        return x * m;
    } else {
        return x;
    }
};
