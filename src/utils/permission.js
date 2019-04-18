// import store from 'store/'
export function hasPermission(role) {
    // const permissions = store.getters.permissions
    console.log('role:',role)
    const permissions = ['student','admin']
    if(role === 'superAdmin'){
        return ture
    } else {
        console.log(permissions)
        return permissions.some(item =>item.indexOf(role) >= 0)
    }
}