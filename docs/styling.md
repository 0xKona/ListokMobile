# Styling Listok

- The users theme is persisted via Redux in the [themeSlice](../redux/slices/themeSlice.ts)

- It has been set up in a way that additional themes should be easy to implement within the [themes.ts](../app/constants/themes.ts) file. Once a theme is selected by the user it should change styles throughout the whole application. We do this by setting up the stylesheets in the following way.

    ```javascript
        // Theme type is defined in themes.ts
        const styles = (props: ThemeType) => StyleSheet.create({
            container: {
                width: '100%',
                flexDirection: 'row',
                height: 50,
            },
        });
    ```

- We then pass this styles function into the custom [useTheme](../app/components/hooks/useTheme.tsx) hook. This is what a typical component looks like. The use theme calls the styles function with the states selected theme and returns the object with the applied themes values.

    ```javascript
        const myComponent = () => {
            const theme = useTheme(styles)

            return (
                <View style={theme.container} >
                    <Text style={theme.text}>Hello World!</Text>
                </View>
            )
        }


        const styles = (props: ThemeType) => StyleSheet.create({
            container: {
                width: '100%',
                flexDirection: 'row',
                height: 50,
                backgroundColor: props.background
            },
            text: {
                color: props.backgroundText
            }
        });
    ```