import channel from './channel/channel.js';

export function get_plan(plan_id){

	return new Promise((resolve, reject)=>{

		channel

			.req( 'get_plan' , 'monetization' , { plan_id } )

			.then( data => {

				resolve( data.response_map )

			} )
		
	})

}

export function getTransactionsLog(){
	return new Promise((resolve,reject)=>{
		channel
			.req( 'log' , 'coins' , {} )

			.then( data => {

				resolve( data.response_map )

			} )
	});
}

export function plans_list (currency){

	return new Promise((resolve, reject)=>{

		channel

			.req( 'plans_list' , 'monetization' , { currency } )

			.then( data => {

				resolve( data.response_map )

			} )
		
	})

}

export function coins_offers (currency, offer_id){

	return new Promise((resolve, reject)=>{

		channel

			.req( 'coins_offers' , 'monetization' , { currency, offer_id } )

			.then( data => {

				resolve( data.response_map )

			} )
		
	})
}

export function balance(){
	return new Promise((resolve, reject)=>{
		channel
		.req( 'balance' , 'coins' )
		.then( data => {
			resolve( data.response_map.balance )
		});		
	})
}

export function subscribe (plan_id, offer_id, shop_id){
	return new Promise((resolve, reject)=>{
		channel.req( 'set_autorefill' , 'monetization' , { offer_id} )
		.then( data => {			
			channel.req( 'subscribe' , 'monetization' , { plan_id,shop_id} )
			.then( subscribe_data => {
				resolve()
			}).catch(error => reject(error))
		}).catch(error => reject(error))
	});
}

export function buy_coins ( offer_id, gateway, redirect ){
	return new Promise((resolve, reject)=>{
		channel.req( 'buy_coins' , 'monetization' , { offer_id, gateway, redirect } )
		.then( data => {
			resolve( data.response_map );
		});		
	})
}

export function setPendingMonetization(object){
	localStorage.setItem("directbot_pending_money",JSON.stringify(object))
}

export function getPendingMonetization(){
	return JSON.parse(localStorage.getItem("directbot_pending_money"))
}

export function unsetPendingMonetization(){
	localStorage.setItem("directbot_pending_money",false)
}