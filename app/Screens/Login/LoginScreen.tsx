import {
  View,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Text,
} from "react-native";
import { FC } from "react";
import { isIos } from "@/utils/HelperUtils";
import { Images } from "@/constants/images";
import Input from "@/components/Input";
import AppButton from "@/components/AppButton";
import { styles } from "./styles";
import { navigate, resetAndNavigate } from "@/utils/NavigationUtils";
import Routes from "@/constants/routes";
import { useFormik } from "formik";
import { LoginValidationSchema } from "@/utils/ValidationUtils";
import { useSigninMutation } from "@/services/auth/auth.query";

const LoginScreen: FC = () => {
  const { mutate: signinMutation, isLoading } = useSigninMutation();

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      signinMutation(values);
    },
  });

  const { values, errors, touched, handleBlur, handleSubmit, handleChange } =
    formik;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={isIos ? "padding" : undefined}
    >
      <StatusBar translucent barStyle={"light-content"} />
      <View style={styles.imageContainer}>
        <Image source={Images.book} style={styles.image} />
        <View style={styles.imageOverlay} />
      </View>
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollViewStyle}
      >
        <View style={styles.logoContainer}>
          <Image source={Images.logo} style={styles.logo} />
        </View>
        <View style={styles.bottomContainer}>
          <Text style={styles.title}>Login</Text>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
            label="Username"
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange("username")}
            error={touched.username ? errors.username : undefined}
            onBlur={handleBlur("username")}
          />
          <Input
            label="Password"
            placeholder="Password"
            value={values.password}
            onChangeText={handleChange("password")}
            secureTextEntry
            error={touched.password ? errors.password : undefined}
            onBlur={handleBlur("password")}
          />
          <AppButton
            isLoading={isLoading}
            title="Login"
            onPress={() => handleSubmit()}
            style={styles.buttonContainer}
          />
          <Text style={styles.text}>
            Don't have an account?
            <Text
              onPress={() => navigate(Routes.SignUpScreen)}
              style={styles.link}
            >
              {" "}
              Click here
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
