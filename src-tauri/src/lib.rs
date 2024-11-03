pub mod contents;
pub mod domain;

pub use contents::local::get_file_info;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![
            get_file_info,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}