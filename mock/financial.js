
function postList(req, res) {

    const data = {
        code: "SUCCESS",
        data: {
            rows: [{
                merchNo: 111111111111,
                memberName: "胡彦祖",
                memberPhone: "15659215539",
                memberLevel: 1,
                memberParent: "郑晓东",
                agent: "马超",
                tradeNo: "4008123123",
                tradeFee: 2000,
                rateFee: 10,
                withdrawFee: 9,
                totalProfit: 10,
                tradeProfit: 4,
                withdrawProfit: 6,
                channelName: "易宝通道",
                tradeCost: 4,
                withdrawCost: 6,
                tradeRate: '6%',
                withdrawRate: "6%",
                tradeTime: "2019-10-1 11:36:30"
            }],
            total: 30
        },
        msg: "查询成功"
    }
    res.json(data);

}

// 收益统计
function postSum(req, res) {

    const data = {
        code: "SUCCESS",
        data: {
            totalTradeProfit:100,
            totalWithdrawProfit:66,
            totalTradeFee:60,
            totalWithdrawFee:10,
            totalTradeCount:80
        },
        msg: "查询成功"
    }
    res.json(data);

}

function postCashOutList(req, res) {
    const data = {
        code: "SUCCESS",
        data: {
            rows: [{
                merchNo: '111111111111',
                merchName: "胡彦祖",
                merchPhone: "15659215539",
                type: 1,
                accountName: "胡彦祖",
                withdrawNo: "4008123123",
                amount: 2000,
                actualAmount: 1900,
                withdrawType: 0,
                rateFee: 4,
                withdrawFee: 6,
                withdrawRate: '6%',
                bankCardNo:"6227001460440078892",
                bankName:"中国银行",
                cardType:0,
                status:0,
                remark:"dasdsadsadas",
                createTime: "2019-10-1 11:36:30",
                finishTime: "2019-10-1 11:36:30",
            }],
            total: 30
        },
        msg: "查询成功"
    }
    res.json(data);
}

// 提现统计
function postCashSum(req, res) {

    const data = {
        code: "SUCCESS",
        data: {
            totalWithdrawAmount:100,
            totalWithdrawCount:66,
            totalWithdrawFee:60,
        },
        msg: "查询成功"
    }
    res.json(data);

}


export default {
    'POST /api/queryProfit': postList,
    'POST /api/queryProfitSum': postSum,
    'POST /api/queryCashOutList': postCashOutList,
    'POST /api/queryCashSum': postCashSum,
};
