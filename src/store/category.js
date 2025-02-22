import firebase from 'firebase';

export default {
    actions: {
        async createCategory({ commit, dispatch }, { title, limit }) {
            try {
                const uid = await dispatch('getUid')
                const category = firebase.database().ref(`/users/${uid}/categories`).push({ title, limit })
                return { title, limit, id: category.key }
            } catch (e) {
                commit('setError', e)
                throw e;
            }
        },

        async fetchCategories({ commit, dispatch }) {
            try {
                const uid = await dispatch('getUid')
                const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {};
                // const cats = [];
                // Object.keys(categories).forEach(key => {
                //     cats.push({
                //         id: key,
                //         title: categories[key].title,
                //         limit: categories[key].limit,
                //     })
                // })
                // return cats;
                return Object.keys(categories).map(key => ({...categories[key], id: key}))
                
            } catch (e) {
                commit('setError', e)
                throw e;
            }
        },

        async fetchCategoryById({ commit, dispatch }, id) {
            try {
                const uid = await dispatch('getUid')
                const category = (await firebase.database().ref(`/users/${uid}/categories`).child(id).once('value')).val() || {};
                return {...category, id}
            } catch (e) {
                commit('setError', e)
                throw e;
            }
        },

        async updateCategory({ commit, dispatch }, { id, title, limit }) {
            try {
                const uid = await dispatch('getUid')
                firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
                
            } catch (e) {
                commit('setError', e)
                throw e;
            }
        }
    }
}