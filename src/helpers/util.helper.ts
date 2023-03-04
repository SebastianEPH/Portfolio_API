export const helpers = {
    removeRepeatedById: (arr: any[]) => {
        const cacheId = ['']

        return arr.filter((item, index) => {
            const notRepeat = cacheId.every((id) => id !== item.id.toString());
            cacheId.push(item._id.toString());
            if (notRepeat) {
                return item;
            }
        });
    }
}
