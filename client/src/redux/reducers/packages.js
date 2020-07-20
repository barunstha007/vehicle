import { SET_ALERT, REMOVE_ALERT } from '../actions/types'

const initialState = {
    searchInput: '',

    packageList: [
        {
            id: 1,
            title: 'One Time Offer',
            desc: 'BIG OFFER BIG OFFER BIG OFFER there is an offer where there is an offer where give free bike servicing from fagun 10 to fagun 30',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR_JDE6x2BhcyNqeakwpir1zmolG-F1RCmeLg&usqp=CAU'
        },
        {
            id: 2,
            title: 'National Bikers Day',
            desc: 'On the occasion where all of the bikers go for long rides and bikes look very dirty We offer all bikers free bike WASH!',
            image: 'https://www.bennetts.co.uk/-/media/bikesocial/2018-february-images-2/motorcycle-servicing-explained/28_motorcycle-servicing-ktm-1050-adventure.ashx?h=493&w=740&la=en&hash=A6FC29F504075E16EA3C2848D7AC1DBF7F5467EA'
        },
        {
            id: 3,
            title: 'Dashain & tIHAR oFFER',
            desc: 'On the splendid occasion of dashain all the bike parts have 20% discount and the servicing fee is free untill the end of the festival',
            image: 'https://media.karousell.com/media/photos/products/2019/09/17/ktm_duke_200_servicing_1568729974_f4015f0b_progressive.jpg'
        },
        {
            id: 4,
            title: 'Free Servcing for 6 months',
            desc: 'On getting the service manual for 2500 RS the rider has free servicing for 6 months, 15% discount on bike parts and free bike was each time the bike enters the service center premesis',
            image: 'https://images.squarespace-cdn.com/content/v1/5aa890afec4eb7d091386e45/1521000862227-Y29TMA6DC1RD7IN4MJ4Z/ke17ZwdGBToddI8pDm48kKAwwdAfKsTlKsCcElEApLR7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UegTYNQkRo-Jk4EWsyBNhwKrKLo5CceA1-Tdpfgyxoog5ck0MD3_q0rY3jFJjjoLbQ/bigstock--205366708-web.jpg?format=1500w'
        },
    ]

}

export default function (state = initialState, action) {

    switch (action.type) {

        case 'SEARCH_INPUT_CHANGE':
            return {
                ...state,
                searchInput: action.value
            }
        default:
            return state;
    }
}