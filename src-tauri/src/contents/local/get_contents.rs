use crate::domain::FileInfo;

use std::fs::{self};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
pub fn get_file_info(path: &str) -> Vec<FileInfo> {
    let mut vec = Vec::new();
    let dirs = fs::read_dir(path).unwrap();
    for entry in dirs {
        let file_info: Result<FileInfo,_> = entry.unwrap().try_into();
        match file_info {
            Ok(file_info) => {
                vec.push(file_info);
            },
            Err(_) => {}
        }
    }    
    return vec 
}