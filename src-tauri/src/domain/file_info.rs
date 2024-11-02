use std::time::SystemTime;
use std::fs::DirEntry;
use anyhow::{anyhow, Result};
use chrono::{DateTime, Utc};

#[derive(serde::Serialize, serde::Deserialize, Debug)]
pub struct FileInfo {
    path: String,
    file_name: String,
    is_dir: bool,
    is_file: bool,
    is_symlink: bool,
    len: u64,
    modified: String,
    accessed: String,
    created: String,
}

impl TryFrom<DirEntry> for FileInfo {
    type Error = anyhow::Error;
    
    fn try_from(dir_entry: DirEntry) -> Result<Self> {
        match dir_entry.metadata() {
            Ok(metadata) => {
                Ok(FileInfo {
                    path: dir_entry.path().to_string_lossy().to_string(),
                    file_name: dir_entry.file_name().to_string_lossy().to_string(),
                    is_dir: metadata.file_type().is_dir(),
                    is_file: metadata.file_type().is_file(),
                    is_symlink: metadata.file_type().is_symlink(),
                    len: metadata.len(),
                    modified: system_time_to_string(metadata.modified().unwrap()),
                    accessed: system_time_to_string(metadata.accessed().unwrap()),
                    created: system_time_to_string(metadata.created().unwrap())
                })
            },
            Err(_) => { Err(anyhow!("Failed to convert DirEntry to FileInfo")) }
        }
    }
}

fn system_time_to_string(time: SystemTime) -> String {
    let datetime: DateTime<Utc> = time.into();
    return datetime.format("%Y-%m-%d %H:%M:%S").to_string();
}
