
const store = process.env.NODE_ENV === 'production'
? require('./prodConfig').default()
: require('./devConfig').default();

// persistStore(store, { storage: localForage });

export default store;
