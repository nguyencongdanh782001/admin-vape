import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUser } from "../../redux/userRedux";

export default function WidgetSm() {
  const { listUser } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAllUser = async () => {
      await dispatch(getAllUser(true))
    }
    fetchAllUser()

  }, [dispatch])

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {listUser.map((item, index) => (
          <li className="widgetSmListItem" key={index}>
            <img
              src={item.img.url}
              alt=""
              className="widgetSmImg"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{item.username}</span>
              {/* <span className="widgetSmUserTitle">Software Engineer</span> */}
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
