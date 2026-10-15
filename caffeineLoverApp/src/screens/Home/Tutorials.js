import { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Modal,
  Pressable,
} from "react-native";
import { WebView } from "react-native-webview";
import Toast from "react-native-root-toast";
import { tutorialCtrl } from "../../api/tutorial";
import { Layout } from "../../layouts";

export function Tutorials() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // console.log("Tutorials component mounted");
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await tutorialCtrl.getLatest();
      // console.log("Response from tutorialCtrl.getLatest:", response);
      setVideos(response?.data || []);
    } catch (error) {
      // console.error("Error fetching videos:", error);
      Toast.show("Error loading videos", {
        position: Toast.positions.CENTER,
      });
    }
  };

  const handleVideoSelect = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedVideo(null);
  };

  return (
    <Layout.Back>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {videos.length > 0 ? (
          videos.map((item) => {
            const videoId = item.urlVideo.split("v=")[1];
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.videoContainer}
                onPress={() => handleVideoSelect(item.urlVideo)}
              >
                <Image
                  source={{ uri: thumbnailUrl }}
                  style={styles.thumbnail}
                />
                <Text style={styles.title}>{item.titleVideo}</Text>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.emptyText}>No videos available</Text>
        )}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeText}>X</Text>
            </Pressable>
            {selectedVideo && (
              <WebView source={{ uri: selectedVideo }} style={styles.webview} />
            )}
          </View>
        </View>
      </Modal>
    </Layout.Back>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 20,
  },
  videoContainer: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thumbnail: {
    width: "100%",
    height: 150,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    height: "60%",
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    padding: 10,
  },
  closeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  webview: {
    flex: 1,
  },
});
