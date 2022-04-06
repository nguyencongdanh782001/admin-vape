import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../../redux/orderRedux";
import "./widgetLg.css";
import { format } from 'timeago.js'
export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  const { order } = useSelector(state => state.order)
  const dispatch = useDispatch()
  useEffect(() => {
    const getOrder = async () => {
      await dispatch(getAllOrder())
    }
    getOrder()
  }, [dispatch])

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {order.map((item, index) => (
            <tr className="widgetLgTr" key={index}>
              <td className="widgetLgUser">
                <span className="widgetLgName">{item.userId}</span>
              </td>
              <td className="widgetLgDate">{format(item.createdAt)}</td>
              <td className="widgetLgAmount">$ {item.amount}</td>
              <td className="widgetLgStatus">
                <Button type={item.status} />
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
