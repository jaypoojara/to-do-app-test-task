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
import { goBack } from "@/utils/NavigationUtils";
import { useFormik } from "formik";
import { SignUpValidationSchema } from "@/utils/ValidationUtils";
import { useSignupMutation } from "@/services/auth/auth.query";

const SignUpScreen: FC = () => {
  const { mutate: signupMutation, isLoading } = useSignupMutation();

  const formik = useFormik({
    initialValues: { username: "", password: "", confirmPassword: "" },
    validationSchema: SignUpValidationSchema,
    onSubmit: async (values) => {
      signupMutation(values);
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
          <Text style={styles.title}>Sign Up</Text>
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
          <Input
            label="Confirm Password"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            secureTextEntry
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
            onBlur={handleBlur("confirmPassword")}
          />
          <AppButton
            isLoading={isLoading}
            title="Sign Up"
            onPress={() => handleSubmit()}
            style={styles.buttonContainer}
          />
          <Text style={styles.text}>
            Already have an account?
            <Text onPress={goBack} style={styles.link}>
              {" "}
              Click here
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;
