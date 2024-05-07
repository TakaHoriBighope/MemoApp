import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { ImageInfo } from "expo-image-picker/build/ImagePicker.types";

const getCameraRollPermission = async () => {
  if (Constants.platform?.ios) {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== "granted") {
      alert("画像を選択するためにはカメラロールの許可が必要です");
    }
  }
};

export const pickImage = async () => {
  // パーミッションを取得
  await getCameraRollPermission();
  // ImagePicker起動
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
  });
  // console.log(result);
  if (!result.canceled) {
    return result.assets[0].uri;
  }
};
