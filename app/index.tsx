import { ExternalLink } from "@/components/ExternalLink";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.viewContainer}>
      <Image source={require("@/assets/logo.png")} style={styles.logoImage} />
      <Image
        source={require("@/assets/icons/app-icon.png")}
        style={styles.logoIcon}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>
            Welcome to the best{"\n"}YouTube-based learning{"\n"}application.
          </Text>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            router.push("/(tabs)");
          }}
        >
          <Text style={styles.loginButtonText}>Log in as guest</Text>
        </TouchableOpacity>
        <View style={styles.termsContainer}>
          <Text style={styles.termsText} numberOfLines={2}>
            By continuing you agree with{"\n"}
            <ExternalLink href="https://example.com" style={styles.termsLink}>
              Terms and Conditions
            </ExternalLink>{" "}
            and{" "}
            <ExternalLink href="https://example.com" style={styles.termsLink}>
              Privacy Policy
            </ExternalLink>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoImage: {
    alignSelf: "center",
    marginTop: 32,
  },
  logoIcon: {
    alignSelf: "center",
    marginTop: 128,
  },
  headerContainer: {
    width: "100%",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "semibold",
    color: Colors.textWhite,
    lineHeight: 24,
    letterSpacing: 0.1,
  },
  loginButton: {
    backgroundColor: Colors.secondary,
    padding: 12,
    width: "100%",
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 24,
  },
  loginButtonText: {
    color: Colors.textWhite,
    fontSize: 16,
    fontWeight: "semibold",
  },
  termsContainer: {
    alignItems: "center",
  },
  termsText: {
    color: Colors.textWhite,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 16,
  },
  termsLink: {
    textDecorationLine: "underline",
    color: Colors.secondary,
  },
});
