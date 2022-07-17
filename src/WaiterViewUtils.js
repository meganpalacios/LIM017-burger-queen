import { sendOrderInFirebase } from '../src/firebase-utils'

export const addProduct = (props) => {
    const selected = props.selected;
    const id = props.item.id;
    const found = selected.some((product) => product.id === id);
    if (!found) {
        props.setSelected([...selected, props.item]);
    } else {
        props.setSelected([...selected]);
    }
    props.item.data.Count = props.item.data.Count + 1;
    props.item.data.LocalTotal = props.item.data.Count * props.item.data.Price;
}

export const subtractProduct = (props) => {
    const selected = props.selected;
    const id = props.item.id;
    // reduce solo funciona si el array de selected está lleno >0, como ya le dieron click a + entonces contiene algo
    // 'acum' acumula todo en un ARRAY VACÍO 
    //"element" es el currentValue xq captura el actual producto al cuál le damos click 
    const nuevoProduct = selected.reduce((acum, element) => {
        // validamos los id al que le damos click (esto hace lo mismo que found)
        // Si los id´s son iguales que reste -1
        if (element.id === id) {
            element.data.Count = element.data.Count - 1;
            props.item.data.Total = props.item.data.Count * props.item.data.Price; // esto es para la función total
        }
        //Aún el acumulador está vacío, por eso le diremos que si contiene algún elemento (osea, >0) que lo acumule
        // push() agregará los "elements" al ARRAY VACÍO que tenemos (osea, acum)
        if (element.data.Count > 0) {
            acum.push(element)
        };
        // filtrar no funciona
        //const filtered = acum.filter((product) => product.data.Count > 0);
        //return filtered;
        return acum;
    }, []);
    props.setSelected(nuevoProduct)
}

export const deleteProduct = (item, selected, setSelected) => {
    //selected trae un objeto completo con cada item 

    //PASOS:
    // capturar el id al que le damos click-> props.id
    //buscar que el index 0,1,2 exacto del item al que le damos click en selected
    const index = selected.findIndex((obj) => obj.id === item.id);    

    /* El método splice() cambia el contenido de un array eliminando elementos
    existentes y/o agregando nuevos elementos. */
    selected.splice(index,1); // con index le decimos la posisición a eliminar y con 1 que solo elimine un elemento
    setSelected([...selected]);
    item.data.Count = 0;
};

export const deleteAllProducts = (selected, setSelected) => {
    selected.forEach(product => {
        product.data.Count = 0;
    });
    setSelected([]);
}

// esto sirve para hacer el número de pedido
const orderNumber = () => {
    const now = Date.now().toString()
    const orderNum = now.substring(6, 12);
    /*const date = new Date();
    const time = date.getTime().substring(6, 12);*/
 
    return orderNum;
}
orderNumber()

export const sendOrderToFireBase = (selected, setSelected, username, total) => {
    console.log('envio')
    const newOrderFirebase = {
        orderNumber : orderNumber(),
        initTime : new Date().toLocaleString('es-PE'), //esto retorna 12/7/2022, 17:46:42
        worker: username,
        //table: ,
        total: total,
        state: 'pending',
        order: selected
    }
    sendOrderInFirebase(newOrderFirebase);
    setSelected([])
}
