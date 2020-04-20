export type Dictionary<T> = {
    [key: string]: T | undefined
}

const mapDictionary = <T, U>(
    dic: Dictionary<T>,
    fn: (arg: T, idx: number) => U
) => {
    const out: Dictionary<U> = {};
    return Object.keys(dic).reduce((acc, key, idx) => {
        const item = dic[key];
        if (!!item) {
            acc[key] = fn(item, idx);
        }
        return acc;
    }, out);
};

const fileExtensions = {
    typescript: ['ts'],
    javascript: ['js'],
    image: ['jpg', 'gif', 'png'],
    template: ['html', 'html', 'jsp']
}
const dictionary = mapDictionary(fileExtensions, (exts) => exts.map((ext) => `*.${ext}`).join(','));
console.assert(dictionary === {
    typescript: '*.ts',
    javascript: '*.js',
    image: '*.jpg, *.gif, *.png'
});
