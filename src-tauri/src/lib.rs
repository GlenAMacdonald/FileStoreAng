use std::fs;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_files(path: &str) -> Vec<String> {
    let mut vec = Vec::new();
    let dirs = fs::read_dir(".").unwrap();
    for entry in dirs {
        let path_str = entry.unwrap().path().as_path().to_str().unwrap().to_string();
        vec.push(path_str);
    }    
    return vec 
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![get_files])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}