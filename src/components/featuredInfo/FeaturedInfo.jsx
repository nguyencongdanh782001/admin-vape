import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIncomeOrder } from "../../redux/orderRedux";
import "./featuredInfo.css";

export default function FeaturedInfo() {
  const { orderIncome } = useSelector(state => state.order)
  const [costTotal, setCostTotal] = useState(0)
  const [percent, setPercent] = useState(0)
  const dispatch = useDispatch()
  useEffect(() => {
    const getIncome = async () => {
      try {
        await dispatch(getIncomeOrder())
      } catch (error) {

      }
    }
    return getIncome()
  }, [dispatch])

  useEffect(() => {
    const getAll = async () => {
      try {
        await setCostTotal(orderIncome.reduce((prev, current) => prev.total + current?.total))
        await setPercent(orderIncome[1].total * 100 / (orderIncome[0].total - 100))
      } catch (error) {

      }
    }
    getAll()
  }, [orderIncome])

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ {costTotal}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(percent)} {percent > 0 ? <ArrowUpwardIcon className="featuredIcon" /> : <ArrowDownwardIcon className="featuredIcon negative" />}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownwardIcon className="featuredIcon negative" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$ 2,000</span>
          <span className="featuredMoneyRate">
            +11.3 <ArrowUpwardIcon className="featuredIcon" />
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
