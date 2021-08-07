<template>
    <div id="main">
        <div class="title">{{ info.nickname }}</div>
        <div class="content">
            <div class="info">
                <img src="./../../assets/img/blibli.png" alt="" />
                <span class="num">{{ follower }}</span>
                <span :class="top ? 'addNum top' : 'addNum'"
                    >{{ status ? "+" : "" }}{{ difference }}</span
                >
            </div>
            <!-- <div class="list">
                <div class="item">
                    <div class="title">{{ videos.title }}</div>
                    <div class="count">
                        <svg
                            t="1628259457007"
                            class="icon"
                            viewBox="0 0 1024 1024"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            p-id="2688"
                        >
                            <path
                                d="M959.901158 643.014672a36.966795 36.966795 0 0 0-47.839382 21.399228c-62.8139 164.373745-223.283398 274.878764-399.271042 274.878764-235.63861 0-427.292664-191.654054-427.292665-427.243243 0-235.63861 191.654054-427.292664 427.292665-427.292664 221.257143 0 408.315058 172.528185 425.859459 392.796911l36.966795-2.965251-36.522007 9.241699 37.016216-2.32278 36.472587-9.834749C991.925869 213.152124 772.398456 10.625483 512.790734 10.625483 236.281081 10.625483 11.366795 235.539768 11.366795 512.049421c0 276.460232 224.914286 501.374517 501.423939 501.374517 206.579151 0 394.823166-129.630888 468.460231-322.520463a37.016216 37.016216 0 0 0-21.349807-47.888803z"
                                fill="#ffffff"
                                p-id="2689"
                            ></path>
                            <path
                                d="M443.898069 309.275676a67.706564 67.706564 0 0 0-68.497297 0 67.706564 67.706564 0 0 0-34.248648 59.305019v286.83861c0 24.759846 12.8 46.949807 34.248648 59.35444 10.724324 6.177606 22.486486 9.29112 34.199228 9.29112 11.762162 0 23.573745-3.113514 34.248649-9.29112l248.389189-143.419305c21.448649-12.355212 34.199228-34.495753 34.199228-59.305019a67.706564 67.706564 0 0 0-34.199228-59.255599L443.898069 309.275676z m-28.664092 336.407722v-267.366796l231.487259 133.683398-231.487259 133.683398z"
                                fill="#ffffff"
                                p-id="2690"
                            ></path>
                        </svg>
                        <span>{{ videos.view }}</span>
                    </div>
                </div>
                <ul class="data">
                    <li>
                        <span class="icon">
                            <svg
                                t="1628260269928"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="4512"
                            >
                                <path
                                    d="M598.354747 67.542626c-48.148687 0-90.130101 32.905051-98.960808 79.437576 0 0-14.312727 72.882424-21.798787 99.090101-12.308687 43.196768-55.363232 90.944646-86.522829 106.188283-23.531313 11.636364-110.99798 11.765657-116.350707 11.765656H155.707475c-32.762828 0-59.384242 26.479192-59.384243 59.384243v475.022222c0 32.762828 26.479192 59.384242 59.384243 59.384242h548.033939c88.126061 0 163.025455-64.452525 176.135758-151.647676l45.873131-305.713132c10.834747-71.809293-44.8-136.274747-117.423838-136.274747H673.254141s20.066263-66.469495 30.228687-178.669899c5.081212-56.837172-35.167677-110.99798-94.280404-117.152323-3.620202-0.54303-7.227475-0.814545-10.847677-0.814546zM333.705051 898.288485V421.533737c38.917172-2.534141 66.999596-8.016162 83.574949-16.316767 43.726869-21.669495 99.633131-81.040808 117.281616-143.088485 7.899798-27.681616 21.39798-96.155152 23.001212-104.184243 3.47798-17.92 20.596364-31.159596 40.649697-31.159596 1.603232 0 3.206465 0.129293 4.822627 0.271516 28.211717 2.947879 43.326061 29.698586 41.32202 52.686868-9.360808 103.912727-27.823838 166.503434-28.082425 166.904243l-23.130505 76.489697h215.182223c17.519192 0 33.564444 7.356768 45.071515 20.596363 11.507071 13.239596 16.316768 30.228687 13.640404 47.618586L821.294545 797.052121c-8.830707 58.569697-58.181818 101.094141-117.423838 101.094142h-370.165656v0.142222z m-177.997576 0v-475.022222h118.626262v475.022222H155.707475z m0 0"
                                    p-id="4513"
                                    fill="#ffffff"
                                ></path>
                            </svg>
                        </span>
                        <span>{{ videos.like }}</span>
                    </li>
                    <li>
                        <span class="icon">
                            <svg
                                t="1628260391436"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="6244"
                            >
                                <path
                                    d="M512 960C265.6 960 64 758.4 64 512S265.6 64 512 64s448 201.6 448 448-201.6 448-448 448z m0-832c-211.2 0-384 172.8-384 384s172.8 384 384 384 384-172.8 384-384-172.8-384-384-384z m0 672c-17.6 0-32-14.4-32-32V480c0-17.6 14.4-32 32-32s32 14.4 32 32v288c0 17.6-14.4 32-32 32z m160-128H352c-17.6 0-32-14.4-32-32s14.4-32 32-32h320c17.6 0 32 14.4 32 32s-14.4 32-32 32z m0-160H352c-17.6 0-32-14.4-32-32s14.4-32 32-32h320c17.6 0 32 14.4 32 32s-14.4 32-32 32z m-160 0c-8 0-16-3.2-22.4-9.6L331.2 344c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l158.4 158.4c12.8 12.8 12.8 32 0 44.8-6.4 6.4-14.4 9.6-22.4 9.6z m0 0c-8 0-16-3.2-22.4-9.6-12.8-12.8-12.8-32 0-44.8L648 299.2c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L534.4 502.4C528 508.8 520 512 512 512z"
                                    p-id="6245"
                                    fill="#ffffff"
                                ></path>
                            </svg>
                        </span>
                        <span> {{ videos.coin }} </span>
                    </li>
                    <li>
                        <span class="icon">
                            <svg
                                t="1628260469447"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="7157"
                            >
                                <path
                                    d="M327.728136 804.301276l150.60509-60.966537 33.721009-13.627369 33.721009 13.627369 150.609183 60.914348-4.484128-166.562527-0.907673-32.985252 20.663622-25.711592 96.563266-120.353089L652.842749 411.574776l-30.030967-9.081843-17.825994-25.716708-92.931552-134.033669-92.871177 134.033669-17.825994 25.716708-30.033014 9.081843-155.490354 47.120181 96.566336 120.29476 20.663622 25.711592-0.907673 32.985252L327.728136 804.301276M789.940197 939.129031 512.054235 826.727031 234.17339 939.129031l8.115841-303.886125L62.389956 411.175687l282.879696-85.667102L512.054235 84.869946l166.843936 240.638639 282.711873 85.667102L781.766027 635.243929 789.940197 939.129031 789.940197 939.129031 789.940197 939.129031z"
                                    p-id="7158"
                                    fill="#ffffff"
                                ></path>
                            </svg>
                        </span>
                        <span>{{ videos.favorite }}</span>
                    </li>
                    <li>
                        <span class="icon">
                            <svg
                                t="1628260603941"
                                class="icon"
                                viewBox="0 0 1058 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="8123"
                            >
                                <path
                                    d="M330.744242 885.372121l194.779798-129.861818 16.665859-11.106263h383.844848c36.486465 0 66.19798-29.659798 66.19798-66.146262v-529.19596c0-36.434747-29.711515-66.107475-66.19798-66.107475H132.305455c-36.486465 0-66.146263 29.659798-66.146263 66.107475v529.19596c0 36.486465 29.659798 66.146263 66.146263 66.146262h198.438787v140.968081m-66.146262 123.578182V810.550303H132.305455c-73.024646 0-132.305455-59.216162-132.305455-132.292525v-529.19596C0 76.024242 59.267879 16.808081 132.305455 16.808081h793.742222c73.076364 0 132.357172 59.216162 132.357171 132.240808v529.195959c0 73.076364-59.267879 132.292525-132.357171 132.292526h-363.830303L264.59798 1008.950303z m0 0"
                                    p-id="8124"
                                    fill="#ffffff"
                                ></path>
                            </svg>
                        </span>
                        <span>{{ videos.reply }}</span>
                    </li>
                    <li>
                        <span class="icon">
                            <svg
                                t="1628260698859"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="19329"
                            >
                                <path
                                    d="M512 160c160 0 320 117.344 480 352-160 234.656-320 352-480 352S192 746.656 32 512C192 277.344 352 160 512 160z m0 64c-123.712 0-254.816 88.864-391.2 273.408L110.144 512l1.536 2.144c136.672 188.896 268.16 281.856 392.224 285.76L512 800c123.712 0 254.816-88.864 391.2-273.408l10.624-14.592-1.504-2.144c-136.672-188.896-268.16-281.856-392.224-285.76L512 224z m0 128a160 160 0 1 1 0 320 160 160 0 0 1 0-320z m0 64a96 96 0 1 0 0 192 96 96 0 0 0 0-192z"
                                    fill="#ffffff"
                                    p-id="19330"
                                ></path>
                            </svg>
                        </span>
                        <span>{{ videos.view }}</span>
                    </li>
                    <li>
                        <span class="icon">
                            <svg
                                t="1628260740378"
                                class="icon"
                                viewBox="0 0 1024 1024"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                p-id="21422"
                            >
                                <path
                                    d="M720.0768 886.7328h-391.168c-84.0192 0-152.32-68.352-152.32-152.32V368.0768c0-84.0192 68.352-152.32 152.32-152.32h191.3344c14.1312 0 25.6 11.4688 25.6 25.6s-11.4688 25.6-25.6 25.6H328.9088c-55.7568 0-101.12 45.3632-101.12 101.12v366.336c0 55.7568 45.3632 101.12 101.12 101.12h391.2192c55.7568 0 101.12-45.3632 101.12-101.12v-210.3296c0-14.1312 11.4688-25.6 25.6-25.6s25.6 11.4688 25.6 25.6v210.3296c0 83.968-68.352 152.32-152.3712 152.32z"
                                    fill="#ffffff"
                                    p-id="21423"
                                ></path>
                                <path
                                    d="M547.7888 705.024c-14.1312 0-25.6-11.4688-25.6-25.6V511.5904c0-104.0896 84.6848-188.8256 188.8256-188.8256h77.9776l-85.5552-94.1056a25.53856 25.53856 0 0 1 1.7408-36.1472 25.53856 25.53856 0 0 1 36.1472 1.7408l105.7792 116.3776a37.92896 37.92896 0 0 1 6.6048 40.8064 37.81632 37.81632 0 0 1-34.6112 22.528h-108.0832c-75.8784 0-137.6256 61.7472-137.6256 137.6256v167.8336c0 14.1312-11.4688 25.6-25.6 25.6z"
                                    fill="#ffffff"
                                    p-id="21424"
                                ></path>
                            </svg>
                        </span>
                        <span>{{ videos.share }}</span>
                    </li>
                </ul>
            </div> -->
        </div>
        <Live />
    </div>
</template>

<script>
import Live from "@/components/Live";

export default {
    name: "Main",
    data() {
        return {
            info: {
                follower: {},
            },
            follower: 0,
            video: [],
            difference: 0,
            status: true,
            top: false,
            videos: {},
            number: 0,
        };
    },
    mounted() {
        // this.getVideo();
        this.getInfo();
        setInterval(() => {
            this.getInfo();
            // this.changeVideo();
        }, 5000);
    },
    methods: {
        getInfo() {
            this.$http
                .post("http://localhost:3000/bilibili/user/getInfo", {
                    mid: this.$store.state.setting.user,
                })
                .then((res) => {
                    this.info.nickname = res.data.data.nickname;
                    this.info.follower = res.data.data.follower;

                    if (this.info.follower != this.follower) {
                        this.top = true;
                        this.difference = this.info.follower - this.follower;
                        if (this.difference > 0) {
                            this.status = true;
                        } else {
                            this.status = false;
                        }
                        this.follower = this.info.follower;
                    }
                    setTimeout(() => {
                        this.top = false;
                    }, 1000);
                    console.log(this.info.follower, this.follower, this.top);
                });
        },
        getVideo() {
            this.$http
                .post("http://localhost:3000/bilibili/user/getVideo", {
                    mid: this.$store.state.setting.user,
                })
                .then((res) => {
                    this.video = res.data.data;
                    this.video.forEach((item) => {
                        item.active = false;
                    });
                    this.videos = this.video[0];
                });
        },
        changeVideo() {
            this.number++;
            if (this.number == this.video.length) {
                this.number = 0;
            }
            this.videos = this.video[this.number];
            console.log(this.video.length - 1, this.number);
        },
    },
    components: {
        Live,
    },
};
</script>

<style scoped>
#main {
    padding: 0 65px;
}

.title {
    color: #fff;
    font-size: 45px;
    text-align: center;
    margin-bottom: 30px;
}

.content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.content .info .addNum {
    opacity: 0;
    position: absolute;
    top: -25px;
    right: 0;
    color: yellow;
    font-size: 35px;
}

@keyframes top {
    to {
        opacity: 1;
        transform: translateY(-15px);
    }
}

.content .info .top {
    animation: top 1s;
}

.content > div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.content span {
    font-size: 120px;
    color: #fff;
}

.content img {
    height: 100px;
    margin-right: 25px;
}

.content .list {
    display: flex;
    flex-wrap: wrap;
}

.content .list > * {
    width: 100%;
    justify-content: center;
    align-items: center;
}

.content .list .item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 25px;
}

.content .list .item div {
    display: flex;
    align-items: center;
    margin: 0;
}

.content .list .item .title {
    font-size: 20px;
    margin-right: 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
}

.content .list .item .count svg {
    width: 20px;
    margin-right: 3px;
}

.content .list .item .count span {
    font-size: 25px;
}

.content .info {
    margin-bottom: 15px;
    position: relative;
}

.data {
    list-style-type: none;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
}

.data li {
    width: 33.33%;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.data li:nth-child(3n-1) {
    width: 100px;
    justify-content: flex-start;
    padding-left: 55px;
}

.data li:nth-child(3n) {
    justify-content: flex-end;
}

.data svg {
    height: 18px;
}

.data span {
    margin-left: 5px;
    font-size: 19px;
    font-weight: bold;
}
</style>