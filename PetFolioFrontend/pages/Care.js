import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  Animated,
  Platform,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

export default function Care() {
  const [selectedDate, setSelectedDate] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("12:00");
  const [reminders, setReminders] = useState([]);
  const [currentReminder, setCurrentReminder] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const [animation] = useState(new Animated.Value(0));

  // Animation effect when component mounts
  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Update marked dates whenever reminders change
  useEffect(() => {
    const newMarkedDates = {};

    reminders.forEach((reminder) => {
      newMarkedDates[reminder.date] = {
        marked: true,
        dotColor: "#ff6b6b",
        selectedDotColor: "white",
      };
    });

    setMarkedDates(newMarkedDates);
  }, [reminders]);

  const handleDayPress = (day) => {
    const selected = {
      [day.dateString]: {
        selected: true,
        selectedColor: "#6b98ff",
        selectedTextColor: "white",
      },
      ...markedDates,
    };

    setMarkedDates(selected);
    setSelectedDate(day.dateString);
    setModalVisible(true);
  };

  const formatDate = (dateString) => {
    const options = { weekday: "long", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const addReminder = () => {
    if (!description.trim()) return;

    const newReminder = {
      id: Date.now(),
      date: selectedDate,
      description,
      time,
      completed: false,
    };

    setReminders([...reminders, newReminder]);
    setDescription("");
    setTime("12:00");
    setModalVisible(false);
  };

  const editReminder = () => {
    if (!description.trim() || !currentReminder) return;

    const updatedReminders = reminders.map((reminder) =>
      reminder.id === currentReminder.id
        ? { ...reminder, description, time }
        : reminder
    );

    setReminders(updatedReminders);
    setDescription("");
    setTime("12:00");
    setCurrentReminder(null);
    setEditModalVisible(false);
  };

  const handleEdit = (reminder) => {
    setCurrentReminder(reminder);
    setDescription(reminder.description);
    setTime(reminder.time);
    setEditModalVisible(true);
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const toggleComplete = (id) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === id
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    );

    setReminders(updatedReminders);
  };

  // Get reminders for current date
  const dailyReminders = reminders.filter(
    (reminder) => reminder.date === selectedDate
  );

  // Group reminders by date for the list view
  const groupedReminders = reminders.reduce((acc, reminder) => {
    if (!acc[reminder.date]) {
      acc[reminder.date] = [];
    }
    acc[reminder.date].push(reminder);
    return acc;
  }, {});

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedReminders).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Pet Care Calendar</Text>
        <Text style={styles.headerSubtitle}>
          Track your pet's care routines and appointments
        </Text>
      </View>

      {/* Calendar Section */}
      <Animated.View
        style={[
          styles.calendarContainer,
          {
            opacity: animation,
            transform: [
              {
                translateY: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}
      >
        <Calendar
          onDayPress={handleDayPress}
          markedDates={markedDates}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#6b98ff",
            selectedDayBackgroundColor: "#6b98ff",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#ff6b6b",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            dotColor: "#ff6b6b",
            selectedDotColor: "#ffffff",
            arrowColor: "#6b98ff",
            monthTextColor: "#6b98ff",
            indicatorColor: "#6b98ff",
            textDayFontFamily: "System",
            textMonthFontFamily: "System",
            textDayHeaderFontFamily: "System",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "500",
            textDayFontSize: 16,
            textMonthFontSize: 18,
            textDayHeaderFontSize: 14,
          }}
        />
      </Animated.View>

      {/* Reminders List Section */}
      <View style={styles.reminderListHeader}>
        <Text style={styles.reminderListTitle}>Upcoming Care Tasks</Text>
        <View style={styles.reminderCounter}>
          <Text style={styles.reminderCountText}>{reminders.length}</Text>
        </View>
      </View>

      <ScrollView
        style={styles.remindersContainer}
        showsVerticalScrollIndicator={false}
      >
        {reminders.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Image
              source={require("../assets/loading.gif")}
              style={styles.emptyStateImage}
              resizeMode="contain"
            />
            <Text style={styles.emptyStateText}>
              No care tasks yet. Tap on a date to add one!
            </Text>
          </View>
        ) : (
          sortedDates.map((date) => (
            <View key={date} style={styles.dateSection}>
              <Text style={styles.dateSectionTitle}>{formatDate(date)}</Text>
              {groupedReminders[date].map((reminder) => (
                <Animated.View
                  key={reminder.id}
                  style={[
                    styles.reminderBox,
                    reminder.completed && styles.completedReminderBox,
                  ]}
                >
                  <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => toggleComplete(reminder.id)}
                  >
                    <View
                      style={[
                        styles.checkbox,
                        reminder.completed && styles.checkboxChecked,
                      ]}
                    >
                      {reminder.completed && (
                        <Ionicons name="checkmark" size={16} color="white" />
                      )}
                    </View>
                  </TouchableOpacity>

                  <View style={styles.reminderContent}>
                    <Text
                      style={[
                        styles.reminderText,
                        reminder.completed && styles.completedReminderText,
                      ]}
                    >
                      {reminder.description}
                    </Text>
                    <View style={styles.reminderMeta}>
                      <View style={styles.timeContainer}>
                        <MaterialIcons
                          name="access-time"
                          size={14}
                          color="#888"
                        />
                        <Text style={styles.timeText}>{reminder.time}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => handleEdit(reminder)}
                    >
                      <MaterialIcons name="edit" size={20} color="#6b98ff" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.iconButton, styles.deleteButton]}
                      onPress={() => deleteReminder(reminder.id)}
                    >
                      <MaterialIcons name="delete" size={20} color="#ff6b6b" />
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              ))}
            </View>
          ))
        )}
        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* Add Reminder Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          const today = new Date().toISOString().split("T")[0];
          setSelectedDate(today);
          setModalVisible(true);
        }}
      >
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Add Reminder Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Care Task</Text>
              <Text style={styles.modalDate}>{formatDate(selectedDate)}</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                placeholder="What needs to be done?"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                multiline
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Time</Text>
              <TextInput
                placeholder="12:00"
                value={time}
                onChangeText={setTime}
                style={styles.input}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setModalVisible(false);
                  setDescription("");
                  setTime("12:00");
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={addReminder}
              >
                <Text style={styles.saveButtonText}>Save Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Edit Reminder Modal */}
      <Modal
        visible={editModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Care Task</Text>
              {currentReminder && (
                <Text style={styles.modalDate}>
                  {formatDate(currentReminder.date)}
                </Text>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                placeholder="What needs to be done?"
                value={description}
                onChangeText={setDescription}
                style={styles.input}
                multiline
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Time</Text>
              <TextInput
                placeholder="12:00"
                value={time}
                onChangeText={setTime}
                style={styles.input}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setEditModalVisible(false);
                  setDescription("");
                  setTime("12:00");
                  setCurrentReminder(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={editReminder}
              >
                <Text style={styles.saveButtonText}>Update Task</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    padding: 20,
    paddingTop: Platform.OS === "ios" ? 0 : 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3b2a2a",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  calendarContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    margin: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  reminderListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  reminderListTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#3b2a2a",
  },
  reminderCounter: {
    backgroundColor: "#6b98ff",
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  reminderCountText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 14,
  },
  remindersContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  dateSection: {
    marginBottom: 20,
  },
  dateSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6b98ff",
    marginBottom: 8,
    paddingHorizontal: 5,
  },
  reminderBox: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 10,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedReminderBox: {
    backgroundColor: "#f8f9fa",
    borderColor: "#e9ecef",
    borderWidth: 1,
  },
  checkboxContainer: {
    marginRight: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#6b98ff",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#6b98ff",
  },
  reminderContent: {
    flex: 1,
  },
  reminderText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  completedReminderText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  reminderMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    fontSize: 13,
    color: "#888",
    marginLeft: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    marginLeft: 8,
  },
  deleteButton: {
    backgroundColor: "#ffebee",
  },
  addButton: {
    backgroundColor: "#ff6b6b",
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: width - 40,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3b2a2a",
  },
  modalDate: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  inputContainer: {
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#f9f9ff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#f1f3f5",
    marginRight: 10,
  },
  saveButton: {
    backgroundColor: "#6b98ff",
    marginLeft: 10,
  },
  cancelButtonText: {
    color: "#555",
    fontWeight: "600",
  },
  saveButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    padding: 20,
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  bottomSpace: {
    height: 80,
  },
});
