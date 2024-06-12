import { isPro } from "@/utils/common";

const devConfig = {
  apiUrl: "https://typo-curator-backend-staging.api.knn3.xyz/api/v1",
  webUrl: "https://typocurator.staging.typox.ai",
  appUrl: "https://t.me/TypoCuratorTest11Bot/TypoCuratorTest",
  browser: "https://testnet.tonscan.org"
}

const proConfig = {
  apiUrl: "https://typo-curator-backend.api.knn3.xyz/api/v1",
  webUrl: "https://typocurator.typox.ai",
  appUrl: "https://t.me/typocurator_bot/TypoCurator",
  browser: "https://tonscan.org"

}

export default isPro ? proConfig : devConfig