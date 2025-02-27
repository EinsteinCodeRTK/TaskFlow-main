// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, arrayUnion, getDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwdRuPUlUH6EFy3XCStjf6Cyjq1ZdLZXQ",
  authDomain: "bigflow-b6fa2.firebaseapp.com",
  projectId: "bigflow-b6fa2",
  storageBucket: "bigflow-b6fa2.firebasestorage.app",
  messagingSenderId: "942216150635",
  appId: "1:942216150635:web:dc2976278ee7b30bf37b2e",
  measurementId: "G-YM9X6HY846"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Auth functions
export const registerUser = async (email, password) => {
  try {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    if (password.length < 6) {
      throw new Error('Password should be at least 6 characters long');
    }

    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document in Firestore
    try {
      await addDoc(collection(db, "users"), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: email.split("@")[0],
        role: "member",
        groups: [],
        createdAt: new Date()
      });
    } catch (firestoreError) {
      console.error("Error creating user document:", firestoreError);
      // If Firestore fails, still return the user but log the error
    }
    
    return userCredential.user;
  } catch (error) {
    console.error("Registration error:", error);
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Email already registered. Please login or use a different email.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address.');
    } else if (error.code === 'auth/operation-not-allowed') {
      throw new Error('Email/password accounts are not enabled. Please contact support.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password is too weak. Please use a stronger password.');
    }
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    // Validate input
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Login error:", error);
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Invalid email address.');
    } else if (error.code === 'auth/user-disabled') {
      throw new Error('This account has been disabled. Please contact support.');
    }
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// Firestore functions
export const createTask = async (taskData) => {
  try {
    console.log('Firebase: Creating new task with data:', taskData);
    
    // Validate required fields
    if (!taskData.title || !taskData.description) {
      console.error('Firebase: Missing required fields:', {
        hasTitle: !!taskData.title,
        hasDescription: !!taskData.description
      });
      throw new Error('Title and description are required');
    }

    if (!taskData.assignedTo || !taskData.assignedTo.length) {
      console.error('Firebase: Missing assignedTo field');
      throw new Error('Task must be assigned to at least one user');
    }

    const taskToSave = {
      ...taskData,
      createdAt: new Date(),
      status: taskData.status || "TODO",
      dueDate: taskData.dueDate instanceof Date ? taskData.dueDate : new Date(taskData.dueDate)
    };

    console.log('Firebase: Saving task to Firestore:', taskToSave);

    const docRef = await addDoc(collection(db, "tasks"), taskToSave);
    
    console.log('Firebase: Task created successfully with ID:', docRef.id);
    
    // Verify the task was created
    const savedTask = await getDoc(docRef);
    if (savedTask.exists()) {
      console.log('Firebase: Verified task data:', savedTask.data());
    } else {
      console.error('Firebase: Task was not saved properly');
      throw new Error('Task was not saved properly');
    }

    return docRef.id;
  } catch (error) {
    console.error('Firebase: Error creating task:', error);
    throw error;
  }
};

export const getTasks = async (userId) => {
  try {
    const q = query(collection(db, "tasks"), where("assignedTo", "array-contains", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || '',
        description: data.description || '',
        priority: data.priority || 'MEDIUM',
        status: data.status || 'TODO',
        dueDate: data.dueDate?.toDate() || new Date(),
        time: data.time || '',
        assignedTo: data.assignedTo || [],
        createdBy: data.createdBy || '',
        createdAt: data.createdAt?.toDate() || new Date(),
        comments: data.comments || []
      };
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, taskData);
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    await deleteDoc(doc(db, "tasks", taskId));
  } catch (error) {
    throw error;
  }
};

// Group functions
export const createGroup = async (groupData) => {
  try {
    const docRef = await addDoc(collection(db, "groups"), {
      ...groupData,
      createdAt: new Date()
    });
    return docRef.id;
  } catch (error) {
    throw error;
  }
};

export const getGroups = async (userId) => {
  try {
    const q = query(collection(db, "groups"), where("members", "array-contains", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    throw error;
  }
};

export const updateGroup = async (groupId, groupData) => {
  try {
    const groupRef = doc(db, "groups", groupId);
    await updateDoc(groupRef, groupData);
  } catch (error) {
    throw error;
  }
};

export const deleteGroup = async (groupId) => {
  try {
    await deleteDoc(doc(db, "groups", groupId));
  } catch (error) {
    throw error;
  }
};

// Comment functions
export const addComment = async (taskId, commentData) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      comments: arrayUnion({
        ...commentData,
        id: crypto.randomUUID(),
        createdAt: new Date()
      })
    });
  } catch (error) {
    throw error;
  }
};

export const removeComment = async (taskId, commentId) => {
  try {
    const taskRef = doc(db, "tasks", taskId);
    const task = await getDoc(taskRef);
    const comments = task.data().comments.filter(comment => comment.id !== commentId);
    await updateDoc(taskRef, { comments });
  } catch (error) {
    throw error;
  }
};

// Test authentication function
export const testAuth = async () => {
  try {
    const testEmail = "test.user3@bigflow.com";
    const testPassword = "TestPassword123!";

    // Try to register
    console.log("Attempting to register test user...");
    const newUser = await registerUser(testEmail, testPassword);
    console.log("Registration successful:", newUser);

    // Try to login
    console.log("Attempting to login test user...");
    const loggedInUser = await loginUser(testEmail, testPassword);
    console.log("Login successful:", loggedInUser);

    return true;
  } catch (error) {
    console.error("Auth test failed:", error.code, error.message);
    return false;
  }
};

export { auth, db };