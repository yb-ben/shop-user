 const getters = {

    token : state=>state.user.token,
     isOnline:(state)=>{
        return state.user.token && state.user.token !== ""
     },
    avatar : state=>state.user.avatar,
    username : state=>state.user.name,
     cartCount: state=>state.cart.count,
     loading:state=>state.loading.loading,
     showNavbar:state=>state.navbar.show
}

export default getters
