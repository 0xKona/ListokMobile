import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { imageApis } from '@app/utils/api-connections/image-api';
import LoadingSpinner from '@app/components/ui/loading-spinner';
import useTheme from '@app/components/hooks/useTheme';
import { ThemeType } from '@app/constants/themes';

interface ImageUploadProps {
    setImage: (image: string) => void;
    image: string;
    authToken: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ image, setImage, authToken }) => {
    const [loading, setLoading] = useState(false);
    const theme = useTheme(styles);

    const handleImageUpload = async () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 800,
                maxHeight: 600,
                quality: 1,
            },
            async (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('Image Picker Error: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    const selectedImage = response.assets[0];
                    if (selectedImage) {
                        setLoading(true);
                        try {
                            // Convert the selected image (Asset) to FormData
                            const formData = new FormData();
                            formData.append('picture', {
                                uri: selectedImage.uri,
                                name: selectedImage.fileName || `image_${Date.now()}.jpg`,
                                type: selectedImage.type,
                            });
    
                            // Call the upload image API
                            const imageUrl = await imageApis.uploadImage(formData, authToken);
                            setImage(imageUrl);
                        } catch (error) {
                            console.error('Failed to upload image:', error);
                        } finally {
                            setLoading(false);
                        }
                    }
                }
            }
        );
    };
    

    const handleDeleteImage = async () => {
        if (!image) return; 
    
        setLoading(true); 
    
        try {
            await imageApis.deleteImage(image, authToken); 
            setImage('');
        } catch (error) {
            console.error('Failed to delete image:', error);
        } finally {
            setLoading(false); 
        }
    };
    

    return (
        <View style={theme.container}>
            {loading && <LoadingSpinner text="Uploading Image..." />}
            {!image ? (
                <TouchableOpacity style={theme.uploadButton} onPress={handleImageUpload}>
                    <Text style={theme.uploadButtonText}>Upload Image</Text>
                </TouchableOpacity>
            ) : (
                <View style={theme.imageContainer}>
                    <Image source={{ uri: image }} style={theme.imagePreview} />
                    <Button title="Delete Image" onPress={handleDeleteImage} color="red" />
                </View>
            )}
        </View>
    );
};

const styles = (theme: ThemeType) =>
    StyleSheet.create({
        container: {
            marginTop: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        uploadButton: {
            padding: 10,
            backgroundColor: theme.surface,
            borderRadius: 5,
        },
        uploadButtonText: {
            color: '#fff',
            fontSize: 16,
        },
        imageContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        imagePreview: {
            width: 200,
            height: 200,
            borderRadius: 10,
            marginBottom: 10,
        },
    });

export default ImageUpload;
