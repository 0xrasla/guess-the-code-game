export const findRandomGist = (gists: any) => {
    const randomIndex = Math.floor(Math.random() * gists.length);
    return gists[randomIndex];
};
