// 모든 API 호출을 위한 axios
const axios = require("axios")
// unsplash API 호출을 위한 Public Key

const client_id = '퍼블릭 키를 넣어주세요'
exports.handler = async (event) => {
    
    
    try{
        // 빗썸 티커별 -> 클레이튼 API get 방식으로 호출
        const klayResult = await axios.get("https://api.bithumb.com/public/ticker/KLAY");
        // unsplash 사이트에서 embed할 랜덤이미지 호출 
        const imgResult  = await axios.get(`https://api.unsplash.com/photos/random?client_id=${client_id}`);
        
                
      


        const klayPriceBot = {
                // Send할 때  내용 삽입
                "content" : '클레이튼 가격 봇 등장!',
                // 포함되는 데이터
                "embeds": [{
                  // 발행인이라고 생각하면 편함
                  "author":{
                    // 이름
                    "name":"클레이튼 가격 봇",
                    // 위의 이름 타고 링크 이동하는 URL 
                    "url":"https://api.bithumb.com/public/ticker/KLAY",
                    // 이름 옆 아이콘 URL , Powered by 해시넷
                    "icon_url":"http://wiki.hash.kr/images/2/28/%ED%81%B4%EB%A0%88%EC%9D%B4%ED%8A%BC_%EB%A1%9C%EA%B3%A0.png",
                    
                },
                // 제목이자 bold 표시되는 부분 (주 내용이라고 생각해도 됨)
                "title":'클레이튼 현재 가격 : '+klayResult.data.data.opening_price +'원',
                // 설명 -> 보통 API 링크와 주소
                "description":"Powered by  [Bithumb API](https://apidocs.bithumb.com/)",
                // 랜덤이미지 따온 이미지를 아래 삽입
                "image": {
                  "url": imgResult.data.urls.thumb,
                  

                },
                }]
              }
        

        
      // 본인 디스코드 웹훅 연동 URI
        const discordUri = "ex) 디스코드닷컴 / api / webhook ..."
        // 적용할 이벤트 조건식 ex) {"bot":"klay"} 일 경우에만.
        if(event.bot === 'klay'){
            const result = await axios.post(discordUri,klayPriceBot);
        }
        // if(event.bot === 'btc'){
        //     const result = await axios.post(discordUri,btcPriceBot);
        // }
        
        console.info("Success");
    }
    catch(err){
        console.info("fail",err);
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};  
