import { View, Text, ScrollView, StyleSheet } from "react-native";
import Header from "../../components/Header";
import FloatingButton from "../../components/FloatingButton";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Detail = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.memoHeader}>
        <Text style={styles.memoTitle}>買い物リスト</Text>
        <Text style={styles.memoDate}>2024年5月1日　10：00</Text>
      </View>
      <ScrollView style={styles.memoBody}>
        <Text style={styles.memoBodyText}>
          １１月の米大統領選を前に、ドイツで独自の核武装論が浮上した。ウクライナ戦争でロシアが勢いづく中、米国で同盟軽視のトランプ政権復活の可能性が浮上し、「米国の『核の傘』に頼れなくなる」という不安が現実味を帯びたためだ。
          政府重鎮が爆弾発言
          ドイツは北大西洋条約機構（ＮＡＴＯ）の核共有の枠組みで、国内に米国の核爆弾を貯蔵している。ＮＡＴＯ欧州で独自に核兵器を持つのは英仏２国だけだ。
          リントナー独財務相は２月、「トランプ前大統領再選」を視野に、英仏と核協力を結ぶ選択肢に触れた。
          独紙フランクフルター・アルゲマイネに寄稿し、「英仏が戦略能力をわれわれの集団安全保障に用いる場合、どういう政治、経済条件を付けるだろう。われわれは、どこまで貢献できるか。欧州平和がかかっており、困難な問題を避けるべきではない」と主張。間接的表現ながらドイツ核武装の可能性に踏み込んだ。リントナー氏は、ショルツ政権の第３与党「自由民主党（ＦＤＰ）」党首でもある。
          ショルツ首相の与党、社会民主党（ＳＰＤ）の重鎮カタリーナ・バーリー欧州議員も、欧州連合（ＥＵ）としての核武装を考慮すべきだとの立場を示した。トランプ政権が復活すれば「米国は頼れなくなる」と警鐘を鳴らした。
          ショルツ氏は「現状では重要な話ではない」と核論議に距離を置く。だが、核抑止力への不安はウクライナ支援に表れている。
          ウクライナのゼレンスキー大統領は４月、ショルツ氏が「ドイツが核武装していない」ことを理由に長射程ミサイル供与を拒んだと明かした。ウクライナは英仏から長射程ミサイルの提供を受け、ロシアが併合したクリミア半島で露軍施設を攻撃している。核兵器を持たないドイツは英仏と異なり、ロシアの報復に強い懸念を抱いているということだ。
        </Text>
      </ScrollView>
      <FloatingButton style={{ top: 130, bottom: "auto" }}>
        <Entypo name="edit" size={30} />
      </FloatingButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  memoHeader: {
    backgroundColor: "#467FD3",
    height: 86,
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 19,
  },
  memoTitle: {
    color: "white",
    fontSize: 20,
    lineHeight: 32,
    fontWeight: "600",
  },
  memoDate: {
    color: "white",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },
  memoBody: {
    paddingHorizontal: 27,
    paddingVertical: 32,
  },
  memoBodyText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000000",
  },
});
export default Detail;
