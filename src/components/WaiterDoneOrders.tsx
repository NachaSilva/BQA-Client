import { useEffect, useState } from "react";
import GetOrders from "../services/TokenOrders";
import OrderTime from "./OrderTime";
import OrderPrevTime from "./OrderPrevTime";
import DoneOrderTime from "./DoneOrderTime";
import { useNavigate } from "react-router-dom";

export const WaiterDoneOrders = () => {
    const [allOrders, setAllOrders] = useState([]);

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/waiter')
    }
    const handleLogOut = () => {
        navigate('/')
    }

    // interface OrdersStatus "pending" | "delivered";
    interface Order {
        client: string;
        products: product[];
        userId: number;
        status: "pending" | "delivered";
        dataEntry: string;
        dateProcessed: string;
        id: string;
    }
    interface product {
        id: number;
        name: string;
        price: number;
        type: string;
        dataEntry: string;
        qty: number
    }


    useEffect(() => {
        GetOrders()
            .then((res) => res.json())
            .then((data) => {
                const filterDelivered = data.filter((currentProduct) => (
                    currentProduct.status === 'delivered'))
                setAllOrders(filterDelivered);
            })
            .catch((e) => {
                console.log('soy catch', e);
            });
    }, []);



    // useEffect(() => {

    //     const filter = allOrders.filter((currentProduct: any) => (
    //         currentProduct.status === 'delivered'))

    //     setAllOrders(filter)
    // }, [allOrders]);

    // const filterDeliveredProducts = (allOrders) => {
    //     // ...allOrders.filter((currentProduct: any) => (
    //     //     currentProduct.status === 'delivered'
    //     // ))
    // }

    const revertString = () => {
        allOrders.map((order: Order) => {
            String(order.id)
        })

    }

    return (
        <>
            <div className="divIcons">
                <img className='burguerLogo' src="./public/img/hamburguerlogo.png" alt="burguer logo" onClick={handleClick} />
                <img className='logOut' src="./public/img/exit.png" alt="cerrar sesion" onClick={handleLogOut} />
            </div>
            <hr />
            <div className="divTable">
                <div className="tableTitle">Ordenes listas</div>
                <table className="table overflow-auto tableDesign">
                    <thead>

                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Inicio</th>
                            <th scope="col">Finalizado</th>
                            <th scope="col">Total</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allOrders.map((order: Order) => (
                            <>
                                <tr key={order.id}>
                                    <td><button className="btn btn-default btn-xs btnTable " type="button" data-bs-toggle="collapse" data-bs-target={`#order${order.id}`} aria-expanded="false" aria-controls={`order${order.id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye eyeColor" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                    </button></td>
                                    {/* <th scope="column">{order.id}</th> */}
                                    <td>{order.client}</td>
                                    <td><OrderPrevTime time={order.dataEntry} /></td>
                                    <td><DoneOrderTime done={order.dateProcessed} /></td>
                                    <td><OrderTime start={order.dataEntry} done={order.dateProcessed} /></td>
                                    <td>{order.status}</td>
                                </tr>

                                <td className="collapse" id={`order${order.id}`}>
                                    <table>
                                <tr>
                                    <th scope="col" >Productos</th>
                                    <th scope="col">Cantidad</th>
                                </tr>
                                {order.products.map((productInOrder) => (
                                    <tr>
                                        <td>{productInOrder.name}</td>
                                        <td>{productInOrder.qty}</td>
                                    </tr>
                                ))}
                                </table>
                                </td>

                            </>
                        ))}
                    </tbody>
                </table>
            </div >
        </>
    );
};

export default WaiterDoneOrders;


{/* <tr>
<td>
    <div  id="demo1">
        <table className="table table-striped">
            <thead>
                <tr className="info">
                    <th>Productos</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                <tr data-target="#demo10">
                    <td>SANDWICH</td>
                    <td>1</td>
                </tr>
            </tbody>
        </table>
    </div>
</td>
</tr> */}