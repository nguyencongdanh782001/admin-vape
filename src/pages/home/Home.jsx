import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import { getUserStats } from "../../redux/userRedux";
import "./home.css";

export default function Home() {
  const { userStats } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [userStat, setUserStat] = useState([])
  const MONTHS = useMemo(() => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ], [])

  useEffect(() => {
    const getStats = async () => {
      try {
        await dispatch(getUserStats())
      } catch (error) {

      }
    }
    getStats()
  }, [dispatch, MONTHS])
  useEffect(() => {
    userStats.map(item => {
      return setUserStat((prev) => [...prev, { name: MONTHS[item._id - 1], "Active User": item.total }])
    })
  }, [MONTHS, userStats])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStat} title="User Analytics" grid dataKey="Active User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
