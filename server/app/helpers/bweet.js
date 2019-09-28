const getDataFromDoc = (doc) => {
    return doc.get().then(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
    });
};

const getDataFromQueryDocuments = (doc) => {
    const data = doc.data();
    data.id = doc.id;
    return data;
}

module.exports = {
    getDataFromDoc,
    getDataFromQueryDocuments
};
